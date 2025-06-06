export const isValidCPF = (cpf: string): boolean => {
    if (!/^\d{11}$/.test(cpf)) return false;

    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const calcCheckDigit = (digits: string, factor: number): number => {
        let total = 0;
        for (let i = 0; i < digits.length; i++) {
            total += Number(digits[i]) * (factor - i);
        }
        const rest = total % 11;
        return rest < 2 ? 0 : 11 - rest;
    };

    const digit1 = calcCheckDigit(cpf.slice(0, 9), 10);
    const digit2 = calcCheckDigit(cpf.slice(0, 9) + digit1, 11);

    return digit1 === Number(cpf[9]) && digit2 === Number(cpf[10]);
};
