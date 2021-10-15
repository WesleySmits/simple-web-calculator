module.exports = (ctx) => ({
    ident: 'postcss',
    sourceMap: true,
    plugins: {
        'postcss-import': {},
        'postcss-at-rules-variables': {},
        'postcss-mixins': {},
        'postcss-each': {},
        'postcss-nested': {},
        'postcss-preset-env': {
            stage: 0,
            autoprefixer: { grid: false }
        },
        'cssnano': ctx.env === 'production' ? {} : false
    }
});
