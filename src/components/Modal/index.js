import React, { memo, forwardRef } from 'react';

import { Modal as AntModal } from 'antd';

import useClassNames from '../../hooks/use-classnames';

import styles from './styles.module.scss';

const Modal = memo(forwardRef(({ className, ...others }, $ref) => {
    const classes = useClassNames([styles.modal, className]);
    return (
        <AntModal ref={$ref} className={classes} {...others} />
    );
}));

export default Modal;
