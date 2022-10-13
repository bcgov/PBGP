import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/generic';
import { AxiosPrivate, cdtToLocalString,utcToLocalString } from 'utils';
import { OrganizationContext } from "providers";
import { useToast } from 'hooks';

export const useAgreementTasks = () => {
  const { id } = useParams();
  const { openToast } = useToast();
  const [isFetchingTasks, setFetchingTasks] = useState(undefined);
  const [taskData, setTasks] = useState();

  const refreshTasks = async () => {
    try {
      setFetchingTasks(true)
      const {data: {tasks}} = await AxiosPrivate.get(`/api/v2/assessment-portal/tasks/organization/${id}`)
      setTasks(tasks)
    } catch (e) {
      openToast({ status: 'error', message: `Failed to get tasks` })
    } finally {
      setFetchingTasks(false)
    }
  };

  return {
    refreshTasks,
    setTasks,
    isFetchingTasks,
    taskData,
  }
};

export const useAgreementFiles = () => {
  const { id } = useParams();
  const { openToast } = useToast();
  const [isFetchingFiles, setFetchingFiles] = useState(undefined);
  const [isDownloadingIndividualFile, setDownloadingIndividualFile] = useState(undefined);
  const [filesList, setFilesList] = useState();

  const refreshFiles = async () => {
    try {
      setFetchingFiles(true)
      const {data: files} = await AxiosPrivate.get(`/api/v2/assessment-portal/tasks/action-item/files/${id}`);
      setFilesList(files.map(file => ({
        ...file,
        dateUploaded: utcToLocalString(file.dateUploaded,'YYYY/MM/DD hh:mm A'),
        download: (
          <Button
            text='Download'
            onClick={() => downloadIndividualFile(file)}
            variant='outlined'
            loading={isDownloadingIndividualFile}
          />
        )
      })))
    } catch (e) {
      openToast({ status: 'error', message: `Failed to get files` });
    } finally {
      setFetchingFiles(false)
    }
  };

  const downloadIndividualFile = async(file) => {
    try {
      setDownloadingIndividualFile(true)
      const response = await AxiosPrivate.get(`/api/v2/assessment-portal/tasks/action-item/download/${file.id}`);
      const link = document.createElement('a');
      link.setAttribute('href', response.data.file);
      link.setAttribute('download', response.data.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      openToast({ status: 'error', message: `Failed to download file ${file.fileName}` });
    } finally {
      setDownloadingIndividualFile(false)
    }
  }

  return {
    refreshFiles,
    setFilesList,
    isFetchingFiles,
    filesList,
  }
}

export const useAgreementFileUpload = () => {
  const { openToast } = useToast();
  const { t } = useTranslation()
  const [isUploading, setUploading] = useState(undefined);
  const { agreementFiles: { refreshFiles } } = React.useContext(OrganizationContext);

  const parseFile = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.readAsDataURL(file)
    })
  }

  return {
    isUploading,
    handleFileUpload: async (id, fileData) => {
      let parsedFile;
      if (fileData) {
        parsedFile = await parseFile(fileData)
      }
      if (parsedFile) {
        try {
          setUploading(true)
          const period = fileData.name.lastIndexOf('.');
          await AxiosPrivate.post(`/api/v2/assessment-portal/tasks/action-item/upload/${id}`,
            {
              file: parsedFile,
              fileName: fileData.name,
              fileSize: fileData.size,
              fileType: fileData.name.substring(period + 1)
            }
          );
          await refreshFiles()
          openToast({ status: 'success', message: t('File uploaded successfully') })
        } catch (e) {
          openToast({ status: 'error', message: `File failed to upload` })
        } finally {
          setUploading(false)
        }
      }
    },
    handleOperatorDashboardFileUpload: async (fileData, taskIndex) => {
      let parsedFile;
      if (fileData) {
        parsedFile = await parseFile(fileData)
      }
      if (parsedFile) {
        try {
          setUploading(true)
          const period = fileData.name.lastIndexOf('.');
          await AxiosPrivate.post(`/api/v1/topup/action-item/upload-and-complete/${taskIndex}`,
            {
              file: parsedFile,
              fileName: fileData.name,
              fileSize: fileData.size,
              fileType: fileData.name.substring(period + 1)
            }
          );
          await refreshFiles()
          openToast({ status: 'success', message: t('File uploaded successfully') })
        } catch (e) {
          openToast({ status: 'error', message: `File failed to upload` })
        } finally {
          setUploading(false)
        }
      }
    },
  }
}