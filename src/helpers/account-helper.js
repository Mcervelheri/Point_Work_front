import React from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip, Tag } from 'antd';

import { PREFIX_ACCOUNT_IN_DOCK_HOMOLOG, PREFIX_ACCOUNT_IN_DOCK_PRODUCTION } from '../values/constants';
import {
    STATUS_TYPES,
    SPD_STATUS,
    STATE_OPTIONS,
    COMPANY_FORMAT,
    GENDER_OPTIONS,
    MARITAL_OPTIONS,
    PROFESSION_OPTIONS,
    ACCOUNT_PROFILE_OPTIONS,
    TYPE_PHONE_OPTIONS,
    STATUS_TYPES_RECHARGES,
} from '../values/enums';
import { PARTNERS_TYPE_OPTIONS } from '../values/enums/accounts';

import { maskWithVerificationDigit } from './masks';

const { REACT_APP_ENV } = process.env;

export const getAccountStatusConfig = statusKey => {
    return STATUS_TYPES.find(statusItem => statusItem.key === statusKey);
};

export const getAccountSPDConfig = spdKey => {
    const startsWithZero = spdKey.startsWith('0');

    let spd = spdKey;

    if (!startsWithZero) {
        spd = `0${spdKey}`;
    }

    return SPD_STATUS.find(spdItem => spdItem.key === spd);
};

export const getClientCompany = arr => {
    if (!arr) return null;
    return arr.find(item => item.accountProfile === 'MAIN');
};

export const getClientPersonArr = arr => {
    if (!arr) return null;
    return arr.filter(item => item.accountProfile !== 'MAIN');
};

export const getClientById = (arr, id) => {
    if (!arr) return null;
    return arr.find(item => `${item.idClient}` === id);
};

export const convertMainPhoneToString = mainPhone => {
    if (mainPhone?.areaCode && mainPhone?.number) {
        const { areaCode, number } = mainPhone;

        return `${parseInt(areaCode, 10)}${number}`;
    }
    return null;
};

export const transformStringToMainPhone = phoneNumber => {

    const areaCode = `0${phoneNumber.substr(0, 2)}`;
    const number = phoneNumber.substr(2);
    const countryCode = '55';

    return { areaCode, number, countryCode };
};

export const getAccountNumber = externalId => {

    if (externalId && externalId !== 'null') {
        return externalId;
    }

    return null;
};

export const extractOnboardingExtraData = result => {
    const { data } = result;

    if (!data || data.length <= 0) return null;

    const company = data[0];
    const idRegistration = getClientCompany(company.clients)?.idRegistration;

    return {
        openAt: company?.openAt,
        externalId: company?.externalId,
        status: company?.status,
        idRegistration,
    };

};

export const getStateOption = stateKey => {
    if (!stateKey) return null;
    return STATE_OPTIONS.find(option => `${option.key}` === `${stateKey}`);
};

export const getEstablishmentFormatOption = eFormatKey => {
    if (!eFormatKey) return null;
    return COMPANY_FORMAT.find(option => `${option?.key}` === `${eFormatKey}`);
};

export const getGenderOption = genderKey => {
    if (!genderKey) return null;
    return GENDER_OPTIONS.find(option => `${option?.key}` === `${genderKey}`);
};

export const getMaritalOption = maritalKey => {
    if (!maritalKey) return null;
    return MARITAL_OPTIONS.find(option => `${option?.key}` === `${maritalKey}`);
};

export const getProfessionalOption = professionalKey => {
    if (!professionalKey) return null;
    return PROFESSION_OPTIONS.find(option => `${option?.key}` === `${professionalKey}`);
};

export const getAccProfileOptions = accProfileKey => {
    if (!accProfileKey) return null;
    return ACCOUNT_PROFILE_OPTIONS.find(option => `${option?.key}` === `${accProfileKey}`);
};

export const getPhoneType = phoneKey => {
    if (!phoneKey) return null;
    return TYPE_PHONE_OPTIONS.find(option => `${option?.key}` === `${phoneKey}`);
};

export const getPartnerTypeOption = (accProfile, type) => {
    if (!accProfile || !type) return PARTNERS_TYPE_OPTIONS[0];
    return PARTNERS_TYPE_OPTIONS.find(data => data.profile === accProfile && data.type === type);
};

export const getRechargeStatusConfig = statusKey => {
    return STATUS_TYPES_RECHARGES.find(statusItem => statusItem.key === statusKey);
};

export const getAccountWithMask = userAccount => {
    const accountPrefix = REACT_APP_ENV === 'production'
        ? PREFIX_ACCOUNT_IN_DOCK_PRODUCTION
        : PREFIX_ACCOUNT_IN_DOCK_HOMOLOG;

    return maskWithVerificationDigit(`${accountPrefix}${userAccount}`);
};

export const mapSPD = spdList => {
    if (!spdList) return null;
    return spdList.map(spd => {
        const config = getAccountSPDConfig(spd);
        return (
            <Tooltip
                placement="bottom"
                title={config?.label}
                key={spd}
            >
                <Tag color="default">
                    <span>
                        {config?.key}
                    </span>
                    <InfoCircleOutlined />
                </Tag>
            </Tooltip>
        );
    });
};
