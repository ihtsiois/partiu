import { randomBytes } from 'crypto';

export const genId = (prefix?: string, bytes?: number) => {
    const randomString = randomBytes(bytes || 18).toString('hex');
    return `${prefix !== undefined ? prefix + '_' : ''}${randomString}`;
};

export const slugfy = (string: string, generateNumbers: boolean = false) => {
    const slug = string
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return generateNumbers ? `${slug}-${Math.floor(Math.random() * 1_000_000)}` : slug;
};

type Address = {
    address_name?: string | null;
    address_line?: string | null;
    address_city?: string | null;
    address_region?: string | null;
    address_country?: string | null;
    address_zip_code?: string | null;
};

export const formatAddress = (address: Address) => {
    const local = address.address_name?.trim() || address.address_line?.trim() || '';
    const city = address.address_city?.trim() || '';
    const region = address.address_region?.trim() || '';

    const cityRegion = city && region ? `${city}-${region}` : city || region;

    if (!local && !cityRegion) return null;

    return [local, cityRegion].filter(Boolean).join(', ');
};

export const gmapUrl = (address: Address) => {
    const parts = [
        address.address_line,
        address.address_city,
        address.address_region,
        address.address_country,
        address.address_zip_code,
    ]
        .filter((part): part is string => Boolean(part))
        .map((part) => part.trim());

    if (parts.length === 0) return null;

    const query = encodeURIComponent(parts.join(','));

    return `https://www.google.com/maps/search/?api=1&query=${query}`;
};
