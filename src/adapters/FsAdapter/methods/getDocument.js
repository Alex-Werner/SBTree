import cloneDeep from 'lodash.clonedeep';

export default async function getDocument(identifier) {
  return cloneDeep(await this.openDocument(identifier));
};
