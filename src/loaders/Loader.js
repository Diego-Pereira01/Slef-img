const _node = require('./../exports/bbt_node');

function loadDrawingInLog() {
    const figletOptions = {
        horizontalLayout: 'full',
        verticalLayout: 'full',
        printDirection: 'ltr',
        showHardBlanks: false,
    };
    _node.figlet.text('SELF IMG', figletOptions, (err, data) => {
        if (err) {
            console.log('Erro ao carregar o desenho no log:', err);
            return;
        }
        const colorfulData = _node.chalk.magenta(data);
        console.log(colorfulData);
    });
}

module.exports = { loadDrawingInLog };