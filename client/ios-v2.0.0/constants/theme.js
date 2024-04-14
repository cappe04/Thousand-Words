const colors = {
    fg: "#DDDDDD", // rgb(221, 221, 221)
    bg: "#30475E", // rgb(48, 71, 94)
    hl: "#F05454", // rgb(240, 84, 84)
    sd: "#20344a",
    // #222831 rgb(34, 40, 49)

    makeAliases: function() {
        this.foreground = this.fg;
        this.default_text = this.fg;

        this.background = this.bg;

        this.highlight = this.hl;
        
        this.shadow = this.sd;
        return this;
    }

}.makeAliases()

const shadows = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    }, 
    smallTop: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
}

export {
    colors, shadows
}