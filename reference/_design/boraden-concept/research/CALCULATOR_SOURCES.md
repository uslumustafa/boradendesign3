# Calculator parameters — verified 2026-09-06

These are frontend estimation tools, not a filing or payroll engine. No entered amounts leave the browser or enter localStorage.

| Parameter | Implemented value | Primary source |
|---|---|---|
| 2026 income tax | 15%, 20%, 27%, 35%, 40%; limits 190,000 / 400,000 / 1,000,000 (wage 1,500,000) / 5,300,000 TL | [GİB 2026 tariff PDF](https://cdn.gib.gov.tr/api/gibportal-file/file/getFileResources?objectKey=arsiv%2Fyardim-kaynaklar%2Fyararli-bilgiler%2Fgelir-vergisi-tarifeleri%2Fgelir-vergisi-tarifesi-2026.pdf) |
| Monthly minimum gross/net | 33,030 / 28,075.50 TL | [ÇSGB February 2026 bulletin](https://csgb.gov.tr/yayinlar/calisma-hayati-istatistikleri-e-bulteni/subat-2026/ucret-ve-sendikal-istatistikler.html) |
| Monthly SGK ceiling | 297,270 TL (9× minimum) | [SGK 2026 PEK limits](https://www.sgk.gov.tr/Content/Post/2e0c9e1a-2cfe-4456-af10-49d3de0c58ba/Prime-Esas-Kazanc-Miktarlari-2026-01-14-10-35-39) |
| Standard employee contributions | SGK 14%, unemployment 1% | [SGK employer information](https://e.sgk.gov.tr/Uygulamalar/Detay/Isveren-Sistemi-2022-10-31-10-05-50) |
| Wage stamp duty | 0.759%; minimum gross wage portion exempt | [GİB tariff](https://gib.gov.tr/mevzuat/kanun/438/teblig/9500), [GİB minimum-wage exemption explanation](https://gib.gov.tr/mevzuat/kanun/433/ozelge/23157) |
| VAT selectable rates | 1%, 10%, 20% | [GİB rate explanation](https://gib.gov.tr/mevzuat/kanun/436/ozelge/30157) |

Income tax uses the **2026 income-year** tariff. It is not the 2025 income tariff used on returns submitted during 2026. The user supplies taxable base, not revenue; deductions, exemptions and withholding credits are not inferred.

Salary scope: standard 4/a employee, full 30-day months, one employer, continuous work from January, minimum-wage tax exemptions. Input the actual previous cumulative income-tax base. No pensioner/SGDP, disability deduction, benefits, BES, incentives, employer cost, midyear employment or multiple-employer calculations. Gross-to-net applies SGK ceiling, employee deductions, bracket tax on the cumulative increment, the monthly minimum-wage exemption and stamp exemption. Net-to-gross uses bounded bisection; results may differ by a kuruş due to payroll rounding.

The historic [7326 workbook](https://boraden.com.tr/dokuman/7326_Hesaplama.xlsx) was downloaded unchanged. It contains “7326 Hesaplama” and “Gelir Vergisi” sheets. It is identified as a **2021 archive**, not a currently open tax-amnesty application. No spreadsheet formulas or macros were executed. The contemporary calculators are independent of that workbook.

Production integration should make parameter validity periods and professional review explicit; do not silently carry 2026 rates into 2027.
