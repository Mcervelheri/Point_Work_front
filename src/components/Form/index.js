import React, { memo } from 'react';

import { Form as AntForm } from 'antd';

const Form = memo(({
    onSubmit, children,
    autoComplete, id,
    ...props
}) => {
    return (
        <AntForm
            {...props}
            component="div"

        >
            <form
                onSubmit={onSubmit}
                autoComplete={autoComplete}
                noValidate
                id={id}
            >
                {children}
            </form>
        </AntForm>
    );
});

Form.propTypes = {
    ...AntForm.propTypes,
};

Form.defaultProps = {
    layout: 'vertical',
};

Form.Item = AntForm.Item;

export default Form;
