import { urlGetRecharges, urlGetRechargesCSVReports } from '../recharges';

test('Valida se a rota urlGetRecharges retorna a url /bff/private/v1/back-office/phone/recharges/reports', () => {
    const urlResult = urlGetRecharges();

    expect(urlResult).toBe('/bff/private/v1/back-office/phone/recharges/reports');
});

test('Valida se a rota urlGetRechargesCSVReports retorna a url /bff/private/v1/back-office/phone/recharges/reports/csv',
    () => {
        const urlResult = urlGetRechargesCSVReports();

        expect(urlResult).toBe('/bff/private/v1/back-office/phone/recharges/reports/csv');
    });
