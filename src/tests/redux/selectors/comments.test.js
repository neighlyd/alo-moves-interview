import comments from '../../fixtures/comments';
import selectComments from '../../../redux/selectors/comments';

it('should sort comments by date', () => {
  const unsorted = [...comments];
  const results = selectComments(comments);
  expect(results).toEqual([unsorted[1], unsorted[0]])
})