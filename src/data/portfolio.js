import portfolio from './portfolio.json';

export const PORTFOLIO_TYPE = {
  PERSONAL: 'personal',
  COMPANY: 'company',
};

const byNewestLegacyId = (a, b) => b.legacyId - a.legacyId;

const isPublished = (item) => item.status === 'published' && item.visible !== false;

const normalizeLegacyId = (id) => Number(id);

export const portfolioItems = portfolio.items;

export const getPortfolioItems = () => portfolioItems.slice();

export const getPublishedPortfolioItems = () =>
  portfolioItems.filter(isPublished).sort(byNewestLegacyId);

export const getPersonalProjects = () =>
  portfolioItems
    .filter((item) => item.type === PORTFOLIO_TYPE.PERSONAL && isPublished(item))
    .sort(byNewestLegacyId);

export const getArchivedPersonalProjects = () =>
  portfolioItems
    .filter((item) => item.type === PORTFOLIO_TYPE.PERSONAL && item.status === 'archived')
    .sort(byNewestLegacyId);

export const getCompanyWorks = () =>
  portfolioItems
    .filter((item) => item.type === PORTFOLIO_TYPE.COMPANY && isPublished(item))
    .sort(byNewestLegacyId);

export const getPersonalProjectByLegacyId = (id) => {
  const legacyId = normalizeLegacyId(id);
  return portfolioItems.find(
    (item) =>
      item.type === PORTFOLIO_TYPE.PERSONAL &&
      item.detailAvailable &&
      item.legacyId === legacyId
  );
};

export const getCompanyWorkByLegacyId = (id) => {
  const legacyId = normalizeLegacyId(id);
  return portfolioItems.find(
    (item) =>
      item.type === PORTFOLIO_TYPE.COMPANY &&
      item.detailAvailable &&
      item.legacyId === legacyId
  );
};

export const getTextPreview = (value, maxLength = 48) => {
  const text = String(value || '').replace(/<[^>]*>/g, '').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
