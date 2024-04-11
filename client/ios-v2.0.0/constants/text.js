import { colors } from "./theme"

const small = {
    fontSize: 16,
    color: colors.default_text,
}

const smallBold = {
    ...small,
    fontWeight: "600"
}

export default {
    small,
    smallBold,
}