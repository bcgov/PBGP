import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AxiosPrivate } from 'utils';
import { useToast } from 'hooks';

export const useGetFilesRequestingSignature = () => {
  const { id } = useParams();
  const { openToast } = useToast();
  const [isFetching, setFetching] = useState(undefined);
  const [filesList, setFilesList] = useState();

  useEffect(() => {
    (async () => {
      try {
        setFetching(true)
        const {data: files} = await AxiosPrivate.get(`/api/v1/topup/organization/signature`);
        setFilesList(files)
      } catch (e) {
        openToast({ status: 'error', message: `Failed to get files` });
      } finally {
        setFetching(false)
      }
    })()
  }, [])

  return {
    isFetching,
    filesList,
    downloadIndividualFile: async(file) => {
      try {
        setFetching(true)
        const response = await AxiosPrivate.get(`/api/v1/topup/action-item/download-and-complete/${file.id}/${file.taskIndex}`);   
        const link = document.createElement('a');
        link.setAttribute('href', response.data.file);
        link.setAttribute('download', response.data.fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        openToast({ status: 'error', message: `Failed to download file ${file.fileName}` });
      } finally {
        setFetching(false)
      }
    },
    refreshFiles: async () => {
      try {
        setFetching(true)
        const {data: files} = await AxiosPrivate.get(`/api/v1/topup/organization/signature`);
        setFilesList(files);
      } catch (e) {
        openToast({ status: 'error', message: `Failed to get files` });
      } finally {
        setFetching(false)
      }
    }
  }
}