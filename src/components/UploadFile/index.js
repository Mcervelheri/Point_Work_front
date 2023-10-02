import React, {
    useState, useCallback, useMemo, memo,
} from 'react';

import { UploadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { fileImagePreview } from '../../helpers/file-helper';
import { wrapFormFieldArray } from '../../helpers/form-helper';
import { messageWarn } from '../../helpers/toast';
import { formatBytes } from '../../helpers/unit-helper';
import useClassNames from '../../hooks/use-classnames';
import { UPLOAD_MAX_FILE_SIZE } from '../../values/enums/accounts';

import ImgLoading from '../ImgLoading';
import Modal from '../Modal';
import UploadItem from './components/UploadItem';
import styles from './styles.module.scss';

const transformSelectFile = file => {
    const url = URL.createObjectURL(file);
    let transformedImageFile;
    if (navigator.msSaveBlob) {
        // if in Microsoft Edge, then fake the "Blob" to
        // a "File" object.
        transformedImageFile = { ...file };
        transformedImageFile.lastModifiedDate = new Date();
        transformedImageFile.lastModified = Date.now();
        transformedImageFile.name = file.name;
    } else {
        transformedImageFile = new File([file], file.name, {
            type: file.type,
            lastModified: Date.now(),
            lastModifiedDate: new Date(),
        });
    }
    transformedImageFile.url = url;
    transformedImageFile.uid = url;
    return transformedImageFile;
};

const validateMaxSize = (file, maxSize) => {
    if (file.size > maxSize) {
        messageWarn(`O arquivo ${file.name} excede o limite de ${formatBytes(maxSize)}`);
        return false;
    }
    return true;
};

const concatFileTypes = (type, acc) => {
    if (!acc) {
        return type;
    }
    return `${acc},${type}`;
};

const UploadFile = memo(props => {

    const {
        width, height,
        addIcon, className,
        addText, maxSize,
        fields, maxFiles,
        accept, label,
        ...otherProps
    } = props;

    const fieldsValue = fields?.value;

    const [fileToPreview, setFileToPreview] = useState(null);

    const name = fields?.name || otherProps.name;

    const acceptTypes = useMemo(() => {
        return Array.isArray(accept)
            ? accept.reduce(concatFileTypes, '')
            : accept;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, Array.isArray(accept) ? accept : [accept]);

    const containerClass = useClassNames([styles.container, className]);

    const selectedFiles = Array.isArray(fieldsValue) ? fieldsValue : [];

    const totalFiles = selectedFiles.length;

    const handleClosePreview = useCallback(() => {
        setFileToPreview(null);
    }, []);

    const handlePreview = useCallback(file => {
        setFileToPreview(file);
    }, []);

    const removeFromField = useCallback(file => {
        const fileIndex = fieldsValue.findIndex(f => f.uid === file.uid);
        if (fileIndex >= 0) {
            fields.remove(fileIndex);
        }
    }, [fields, fieldsValue]);

    const handleRemove = useCallback(file => {
        removeFromField(file);
    }, [removeFromField]);

    const handleDownload = useCallback(file => {
        const url = file?.url || window.URL.createObjectURL(file, { oneTimeOnly: true });
        if (url) window.open(url, '_blank');
    }, []);

    const handleAddFile = useCallback(event => {
        event.preventDefault();

        const { files } = event.target;

        const filesLeft = Math.max(maxFiles - totalFiles, 0);

        const filteredFiles = Array.prototype.slice.call(files, 0, filesLeft);

        if (filteredFiles.length !== files.length) {
            messageWarn(`Você atingiu o limite de ${maxFiles} arquivos selecionados.`);
        }

        const mappedFiles = filteredFiles
            .filter(file => validateMaxSize(file, maxSize))
            .map(transformSelectFile);

        mappedFiles.forEach(file => fields.push(file));
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';

    }, [maxSize, maxFiles, totalFiles, fields]);

    const renderItem = item => {

        return (
            <UploadItem
                key={item?.uid}
                file={item}
                width={width}
                height={height}
                onPreview={handlePreview}
                onRemove={handleRemove}
                onDownload={handleDownload}
            />
        );
    };

    const showAddButton = totalFiles < maxFiles;

    const renderAddButton = () => {
        return (
            <div className={styles.labelContainer}>
                <span>{label}</span>
                <div className={styles.addButton}>
                    <label
                        htmlFor={`upload-file-${name}`}
                        className={styles.addButtonContent}
                    >
                        {addIcon}
                        <span className={styles.text}>
                            {addText}
                        </span>
                        <input
                            type="file"
                            id={`upload-file-${name}`}
                            onChange={handleAddFile}
                            className={styles.inputFile}
                            multiple={maxFiles > 1}
                            accept={acceptTypes}
                        />
                    </label>
                </div>
            </div>
        );
    };

    const renderImage = useMemo(() => {

        if (!fileToPreview) return null;

        const urlImage = fileImagePreview(fileToPreview);

        return (
            <ImgLoading
                src={urlImage}
                alt={`Pré-visualização do arquivo ${fileToPreview.name}`}
                className={styles.imagePreview}
            />
        );
    }, [fileToPreview]);

    return (
        <div>
            <div className={containerClass}>
                {showAddButton ? renderAddButton() : null}
                {selectedFiles.map(renderItem)}
            </div>
            <Modal
                visible={Boolean(fileToPreview)}
                footer={null}
                onCancel={handleClosePreview}
            >
                {renderImage}
            </Modal>
        </div>
    );
});

UploadFile.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    addIcon: PropTypes.element,
    addText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    className: PropTypes.string,
    maxSize: PropTypes.number,
    maxFiles: PropTypes.number,
    label: PropTypes.string,
    fields: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    accept: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
};

UploadFile.defaultProps = {
    height: 48,
    width: 48,
    label: 'Identidade/CNH:',
    addIcon: <UploadOutlined className={styles.addIcon} />,
    addText: 'Enviar arquivo',
    maxSize: UPLOAD_MAX_FILE_SIZE,
    maxFiles: 2,
};

UploadFile.Field = wrapFormFieldArray(UploadFile);
export default UploadFile;
