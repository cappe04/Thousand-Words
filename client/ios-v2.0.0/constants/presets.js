import { colors } from "./theme"

const text = {
    extraSmall: {
        fontSize: 12,
        color: colors.default_text,
    },
    small: {
        fontSize: 16,
        color: colors.default_text,
    },

    medium: {
        fontSize: 24,
        color: colors.default_text,
    },

    large: {
        fontSize: 32,
        color: colors.default_text,
    },

    extraLarge: {
        fontSize: 48,
        color: colors.default_text,
    },

    mediumBlack: {
        fontSize: 24,
    },

    largeBlack: {
        fontSize: 32,
    },
    
    makeBold: function(_text) {
        return {
            ..._text,
            fontWeight: "600",
        }
    }
}

const container = {
    safe: {
        flex: 1,
        backgroundColor: colors.bg,
    },
    safeDark: {
        flex: 1,
        backgroundColor: colors.sd,
    }
}

export {
    text,
    container,
}