import Debug from 'debug';
const debug = Debug('fabnavi:VisualizeSearch:convertProjectUtil');

export const convertProject = project => {
  if(!project) return null;
  if(typeof project !== 'object') {
    debug('invalid project data');
    return null;
  }
  const MountType = {
    name: project.name,
    tags: project.tags.tags.map(tag => {
      return {
        filter: true,
        tag: tag.name
      };
    }),
    figures: project.content,
    children: []
  };
  return MountType;
};
