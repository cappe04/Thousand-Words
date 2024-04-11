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
        return this;
    }

}.makeAliases()

export {
    colors
}