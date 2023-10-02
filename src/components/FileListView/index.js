import React, {
    useCallback, useState, useMemo, memo,
} from 'react';

import 'react-responsive-carousel/lib/styles/carousel.css';
import PropTypes from 'prop-types';
import { Carousel } from 'react-responsive-carousel';

import { resolveImageUrl, isFileImage } from '../../helpers/file-helper';
import useClassNames from '../../hooks/use-classnames';

import Modal from '../Modal';
import FileItem from './components/FileItem';
import styles from './styles.module.scss';

const statusFormatter = (current, total) => `${current}/${total}`;

const FileListView = memo(({
    files, className,
    width, height,
}) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);

    const images = useMemo(() => {
        return files.filter(file => isFileImage(file.mimetype));
    }, [files]);

    const handleClosePreview = useCallback(() => {
        setPreviewVisible(false);
    }, []);

    const handlePreviewChange = useCallback(index => {
        setPreviewIndex(index);
    }, []);

    const handlePreview = useCallback(file => {
        setPreviewVisible(true);
        const index = images.findIndex(img => img.id === file.id);
        setPreviewIndex(index);
    }, [images]);

    const renderFile = file => {
        return (
            <FileItem
                key={file.id}
                file={file}
                width={width}
                height={height}
                onPreview={handlePreview}
            />
        );
    };

    const renderImage = image => {
        return (
            <div key={image.id} className={styles.imageContainer}>
                <img
                    src={resolveImageUrl(image.caminho)}
                    alt={image.nome_original}
                    className={styles.image}
                />
            </div>
        );
    };

    const classes = useClassNames([styles.list, className]);

    if (!files.length) return null;

    return (
        <>
            <ul className={classes}>
                {files.map(renderFile)}
            </ul>
            <Modal
                visible={previewVisible}
                onCancel={handleClosePreview}
                footer={null}
                width="90vw"
                className={styles.modal}
                centered
            >
                <Carousel
                    showArrows
                    useKeyboardArrows
                    className={styles.carousel}
                    statusFormatter={statusFormatter}
                    selectedItem={previewIndex}
                    onChange={handlePreviewChange}
                >
                    {images.map(renderImage)}
                </Carousel>
            </Modal>
        </>
    );
});

FileListView.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    files: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        caminho: PropTypes.string.isRequired,
        nome_original: PropTypes.string.isRequired,
        mimetype: PropTypes.string.isRequired,
    })),
};

FileListView.defaultProps = {
    width: 150,
    height: 150,
    files: [],
};

export default FileListView;
