import React, {
    useMemo, useState,
} from 'react';

import { Table } from 'antd';

import { extractRequestError } from '../helpers/error-helper';
import { maskCNPJOrCPF } from '../helpers/masks';
import useAsync from '../hooks/use-async';
import useAxios from '../hooks/use-axios';
import useDidMount from '../hooks/use-did-mount';

import styles from './styles.module.scss';

const AccountsList = () => {

    const axios = useAxios();
    const [data, setData] = useState([]);

    const columns = useMemo(() => {
        return (
            [{
                title: 'Nome',
                dataIndex: 'nome',
                key: 'id',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'id',
            },
            {
                title: 'CPF',
                dataIndex: 'cpf',
                key: 'id',
                render: nationalRegistration => maskCNPJOrCPF(nationalRegistration.toString()),
            },
            ]
        );
    }, []);

    const { loading, call: getDataUsers } = useAsync(async () => {

        try {
            const response = await axios.get('/funcionarios');
            setData(response.data);

        } catch (exception) {
            extractRequestError(exception, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }

    }, [axios]);

    useDidMount(async () => {
        await getDataUsers();
    });

    return (
        <div className={styles.container}>
            <Table
                loading={loading}
                rowKey="id"
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default AccountsList;
