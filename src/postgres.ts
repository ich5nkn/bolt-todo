// eslint-disable-next-line @typescript-eslint/no-var-requires
const models = require('../../models');

export const getTask = (id: number) => {
    return models.tasks.findOne({
      where: {
        id: id
      }
    }) as Promise<any>;
  };