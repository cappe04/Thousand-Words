import { colors } from "./theme"

const text = {
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
    }
}

export {
    text,
    container,
}