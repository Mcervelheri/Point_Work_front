import React, {
    memo, useEffect, useState, useCallback, useMemo,
} from 'react';

import PropTypes from 'prop-types';

export const FontAwesome = 'FontAwesome';
export const Ionicons = 'Ionicons';
export const MaterialIcons = 'MaterialIcons';
export const Octicons = 'Octicons';
export const Typicons = 'Typicons';
export const AntDesign = 'AntDesign';

const getIconFamily = async familyName => {
    let iconFamily;
    switch (familyName) {
        case FontAwesome:
            iconFamily = await import('react-icons/fa');
            break;
        case Typicons:
            iconFamily = await import('react-icons/ti');
            break;
        case Ionicons:
            iconFamily = await import('react-icons/io');
            break;
        case Octicons:
            iconFamily = await import('react-icons/go');
            break;
        case AntDesign:
            iconFamily = await import('react-icons/ai');
            break;
        case MaterialIcons:
        default:
            iconFamily = await import('react-icons/md');
            break;
    }
    return iconFamily;
};

const getIconComponent = (family, name = '') => {
    try {
        const iconName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const iconKey = Object.keys(family)
            .find(key => key.substring(2).toLowerCase() === iconName);
        return family[iconKey];
    } catch (ex) {
        console.warn(ex);
        return null;
    }
};

const Icon = memo(({
    family, name, size, style, ...others
}) => {
    const [iconFamily, setIconFamily] = useState(null);

    const requestFamily = useCallback(async () => {
        const iconFam = await getIconFamily(family);
        setIconFamily(iconFam);
    }, [family]);

    useEffect(() => {
        requestFamily();
    }, [requestFamily]);

    const IconComp = useMemo(() => iconFamily && getIconComponent(iconFamily, name), [iconFamily, name]);

    const iconStyles = useMemo(() => ({
        width: size,
        height: size,
        ...style,
    }), [size, style]);

    if (!IconComp) {
        return (
            <span
                style={iconStyles}
                {...others}
            >
                {' '}
            </span>
        );
    }

    return (
        <IconComp
            size={size}
            style={iconStyles}
            {...others}
        />
    );
});

Icon.propTypes = {
    family: PropTypes.oneOf([
        Typicons,
        FontAwesome,
        Ionicons,
        MaterialIcons,
        Octicons,
        AntDesign,
    ]),
    name: PropTypes.string.isRequired,
    size: PropTypes.number,
    style: PropTypes.shape({}),
};

Icon.defaultProps = {
    family: MaterialIcons,
    style: undefined,
    size: undefined,
};

export default Icon;
