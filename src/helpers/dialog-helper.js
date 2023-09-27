import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { withRouter } from 'react-router-dom';

import Providers from '../components/Providers';

const destroyFns = [];

export const destroyAllDialogs = () => {
    destroyFns.forEach(close => close());
    destroyFns.splice(0, destroyFns.length);
};

export const wrapDialog = ModalComponent => {
    // eslint-disable-next-line no-param-reassign
    ModalComponent.show = config => {
        const div = document.createElement('div');
        document.body.appendChild(div);

        const ModalComponentWithRouter = withRouter(ModalComponent);

        function render(props) {
            ReactDOM.render(
                (
                    <Providers>
                        <Suspense fallback="Carregando...">
                            <ModalComponentWithRouter {...props} />
                        </Suspense>
                    </Providers>
                ),
                div,
            );
        }

        function afterClose(...args) {
            const unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div);
            }
            if (config?.onClose) {
                config.onClose(...args);
            }
        }

        function onCancel() {
            const index = destroyFns.findIndex(cancel => cancel === this);
            destroyFns.splice(index, 1);
            render({
                ...config,
                visible: false,
                afterClose,
            });
        }

        destroyFns.push(onCancel);

        render({
            ...config,
            visible: true,
            afterClose,
            onCancel,
        });

        return {
            destroy: onCancel,
        };
    };

    return ModalComponent;
};
