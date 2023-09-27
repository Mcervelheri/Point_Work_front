
import { useState } from 'react';

import useAsync from '../hooks/use-async';

import useDocumentAccountId from './useDocumentAccountId';
import useDocumentData from './UseDocumentData';

const selfieType = 'SELFIE';
const identityCardFrontType = 'IDENTITY_CARD_FRONT';
const identityCardVerseType = 'IDENTITY_CARD_VERSE';
const driverLicenseFrontType = 'DRIVER_LICENSE_FRONT';
const driverLicenseVerseType = 'DRIVER_LICENSE_VERSE';

const useDocumentsPreview = () => {

    const [selfieBase64, setSelfieBase64] = useState();
    const [identityCardFrontBase64, setIdentityCardFrontBase64] = useState();
    const [identityCardVerseBase64, setIdentityCardVerseBase64] = useState();
    const [driverLicenseFrontBase64, setDriverLicenseFrontBase64] = useState();
    const [driverLicenseVerseBase64, setDriverLicenseVerseBase64] = useState();

    const { requestDocumentByAccountId, fetchingDocumentByAccountId } = useDocumentAccountId();

    const { requestDocumentData, fetchingDocumentData } = useDocumentData();

    const { call: getDocumentData } = useAsync(async accountId => {

        try {
            const response = await requestDocumentByAccountId(accountId);

            const selfieDocument = response.find(element => element.type === selfieType);
            const identityCardFrontDocument = response.find(element => element?.type === identityCardFrontType);
            const identityCardVerseDocument = response.find(element => element?.type === identityCardVerseType);
            const driverLicenseFrontDocument = response.find(element => element?.type === driverLicenseFrontType);
            const driverLicenseVerseDocument = response.find(element => element?.type === driverLicenseVerseType);

            const responseSelfie = await requestDocumentData(selfieDocument?.id);
            const responseIdCardFront = await requestDocumentData(identityCardFrontDocument?.id);
            const responseIdCardVerse = await requestDocumentData(identityCardVerseDocument?.id);
            const responseDriverLicenseFront = await requestDocumentData(driverLicenseFrontDocument?.id);
            const responseDriverLicenseVerse = await requestDocumentData(driverLicenseVerseDocument?.id);

            setSelfieBase64(responseSelfie);
            setIdentityCardFrontBase64(responseIdCardFront);
            setIdentityCardVerseBase64(responseIdCardVerse);
            setDriverLicenseFrontBase64(responseDriverLicenseFront);
            setDriverLicenseVerseBase64(responseDriverLicenseVerse);

        } catch (error) {
            console.warn(error);
        }
    }, [requestDocumentByAccountId, requestDocumentData]);

    return {
        selfieBase64,
        getDocumentData,
        fetchingDocumentData,
        identityCardFrontBase64,
        identityCardVerseBase64,
        driverLicenseFrontBase64,
        driverLicenseVerseBase64,
        fetchingDocumentByAccountId,
    };
};

export default useDocumentsPreview;
