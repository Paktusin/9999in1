function importAll(r) {
    return r.keys().sort((el1, el2) => {
        return parseInt(el1.replace('./back', '')) > parseInt(el2.replace('./back', '')) ? 1 : -1;
    }).map(r);
}

const backs = importAll(require.context('../img/back', false, /\.png/));

const images = {
    backs
};

export default images;



