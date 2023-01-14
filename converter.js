const RATES = {
    usd: 0.015,
    eur: 0.014
};

function convert({ rub, currency }) {
    if (!RATES[currency]) {
        return null;
    }

    return rub * RATES[currency];
}