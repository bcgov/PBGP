import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

export interface FileUploadProps {
  onChange?: (...event: any[]) => void;
  title: string;
  description: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ title, description, onChange }) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop });
  const files =
    acceptedFiles.length > 0 &&
    acceptedFiles.map((file) => {
      return <span key={file.name}>{file.name}</span>;
    });

    return (
    <div className='w-full mb-2'>
      <h3 className='text-xl text-bcBlack font-bold w-full'>{title}</h3>
      <p className='text-gray-400 mb-2 text-sm'>{description}</p>

      {files && (
        <div className='flex flex-row rounded-md mb-2 w-full py-2 px-4 bg-gray-300'>
          <div aria-label={`Uploaded file ${files}`} className='basis-3/4'>{files}</div>
          <div className='basis-1/4'>
            <FontAwesomeIcon icon={faXmark} className='h-6 text-gray-800' />
          </div>
        </div>
      )}

      <label
        {...getRootProps()}
        className='flex dropzone justify-center w-full h-36  p-4 py-6 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'
      >
        <span className='flex flex-col items-center space-x-2'>
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className='text-bcBluePrimary h-12'
          />
          <span className='font-medium text-gray-600'>
            {isDragActive ? 'Drop the files here ...' : 'Drop your file here, or'}
          </span>
          <span className='text-blue-600 underline'>browse from your device</span>
        </span>
        <input aria-label="browse from your device" {...getInputProps({onChange})}  />
      </label>
    </div>
  );
};
