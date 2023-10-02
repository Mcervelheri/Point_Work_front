import React, {
    useState, useMemo, useCallback, memo,
} from 'react';

import { MenuFoldOutlined } from '@ant-design/icons';
import { PageHeader as AntdPageHeader, Button } from 'antd';

import PageHeader from '../../components/PageHeader';
import useClassNames from '../../hooks/use-classnames';
import useScreen from '../../hooks/use-screen';

import SidePageContent from './components/SidePageContent';
import styles from './styles.module.scss';

const ContentPage = memo(({
    children, extra, sider, headerTitle,
    containerClassName, siderWidth,
    pageHeaderClassName, headerButtons, hasBackButton,
    ...others
}) => {
    const { sizes: { isDesktop } } = useScreen();
    const [shouldShowSider, setShowSider] = useState(false);

    const onToggleSiderClick = useCallback(() => {
        setShowSider(prev => !prev);
    }, []);

    const siderToggleButton = useMemo(() => {
        if (sider && !isDesktop) {
            return (
                <Button
                    type="dashed"
                    data-testid="menu-button"
                    icon={<MenuFoldOutlined />}
                    onClick={onToggleSiderClick}
                    className={styles.siderToggleButton}
                />
            );
        }

        return null;

    }, [onToggleSiderClick, sider, isDesktop]);

    const containerClasses = useClassNames([styles.mainContainer, containerClassName]);
    const pageHeaderClasses = useClassNames([
        styles.pageHeader,
        {
            [styles.pageHeaderWithSider]: Boolean(sider),
        },
        pageHeaderClassName,
    ]);

    return (
        <div className={containerClasses}>
            <AntdPageHeader
                {...others}
                extra={siderToggleButton}
                ghost={false}
                className={pageHeaderClasses}
            >
                <div className={styles.pageHeaderContent}>
                    <PageHeader
                        title={headerTitle}
                        buttons={headerButtons}
                        hasBackButton={hasBackButton}
                    />
                    {children}
                </div>
            </AntdPageHeader>

            {sider ? (
                <SidePageContent
                    width={siderWidth}
                    className={styles.sider}
                    visible={shouldShowSider}
                    isDesktop={isDesktop}
                    onClose={onToggleSiderClick}
                >
                    {sider}
                </SidePageContent>
            ) : null}
        </div>
    );
});

ContentPage.defaultProps = {
    hasBackButton: false,
};

export default ContentPage;
