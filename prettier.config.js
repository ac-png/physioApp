module.exports = {
    printWidth: 120,
    tabWidth: 4,
    singleQuote: false,
    bracketSameLine: false,
    trailingComma: "es5",

    plugins: [require.resolve("prettier-plugin-tailwindcss")],
    tailwindAttributes: ["className"],
};
