import React, { useEffect, useState } from 'react';
import { useModal } from './modal';
import { Route } from '../constants';

const windowConfig = 'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

/**
 * Opens a "session expired" modal prompting the user to re-authenticate.
 * This in turns open a popup window taking the user to the app id login page.
 * 
 * Show "Session Expired" popup
 * -> Show AppID auth window
 * -> Log in to AppID, This will set a new auth cookie which the Kubernetes ingress translates to an Authorization header
 * -> Redirect user to /app_callback
 * -> Posts auth_successful message to this window and closes popup window
 * -> show "Authentication Successful" modal
 * -> Carry on without leaving the page.
 */
export const useOpenSignInWindow = () => {
    const { openModal, closeModal } = useModal();

    const doShowLoginWindow = () => {
        /**
         * Open logout url in new popup window.
         * This redirects the user to the AppID sign in page.
         */
        const reauthenticateWindow = window.open(Route.AppIDLogout, 'Login', windowConfig);
        window.isReauthenticating = true;
            
        /**
         * Wait for a `auth_successful` message posted by the opened auth window,
         * indicating that authentication was successful.
         */
        window.addEventListener('message', event => {
            if(event.data === 'auth_successful') {
                window.isReauthenticating = false;
                closeModal();
                openModal({
                    title: 'Authentication Successful',
                    description: `Successfully authenticated. Please carry on where you left off`,
                    positiveActionText: 'Ok',
                    positiveActionOnClick: () => {
                        closeModal();
                    }
                });                
            }
        }, false);
    }



    return {
        openAuthRequiredPrompt: async () => {
            openModal({
                title: 'Session Expired',
                description: `Your session has expired. Please click "Authenticate" to log in again. Once logged in again, you will be able to continue from where you left off.`,
                negativeActionText: 'Cancel',
                positiveActionText: 'Authenticate',
                negativeActionOnClick: () => closeModal(),
                positiveActionOnClick: () => doShowLoginWindow()
            });        
        }
    };
}