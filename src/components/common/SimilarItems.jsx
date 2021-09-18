import AddToMyListButton from '@components/buttons/AddToMyListButton';
import { IMAGE_BASE } from '@services/axios.service';
import { selectUserLists } from '@store/user-lists/selectors.user-lists';
import { includeObjectById } from '@utils/array.utils';
import { truncate } from '@utils/convertor.utils';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import PreviewPopperTip from './PreviewPopperTip';

const SimilarItems = ({ movies, toggleMyList }) => {
  const { myList } = useSelector(selectUserLists);

  return (
    <>
      {movies.length > 0 &&
        movies.map((movie) => {
          const inMyList = includeObjectById(myList, movie.id);
          return (
            <div
              key={movie.id}
              className="relative z-50 rounded bg-grey-bg h-96"
            >
              <img
                src={`${IMAGE_BASE}/w300/${movie.backdrop_path}`}
                alt="similar_movie"
                className="object-cover object-center w-full rounded-t h-44 lg:h-36 z-1"
              />
              <div className="absolute top-0 right-0 z-20 p-2">1h17m</div>
              <div className="absolute top-0 right-0 z-10 w-full h-24 rounded bg-gradient-to-bl from-black via-transparent"></div>
              <div className="flex items-stretch justify-between mx-3 mt-5">
                <div className="flex flex-col items-start">
                  <div className="font-medium text-green">
                    {`${Math.round(movie.vote_average * 10)}% Match`}
                  </div>
                  <div>
                    <span className="px-2 leading-tight border border-white border-opacity-50 border-solid">
                      {movie.adult ? '18+' : '13+'}
                    </span>
                    <span className="ml-3">
                      {movie.release_date?.split('-')?.[0] || null}
                    </span>
                  </div>
                </div>
                <PreviewPopperTip
                  arrow
                  className="text-white"
                  title={inMyList ? 'Remove from My List' : 'Add to My List'}
                  placement="top"
                >
                  <AddToMyListButton
                    inMyList={inMyList}
                    onClick={() => toggleMyList(movie)}
                    className="box-border w-8 h-8 p-2 mr-2 transition-all duration-200 border border-white border-opacity-50 border-solid rounded-full hover:border-opacity-100"
                  />
                </PreviewPopperTip>
              </div>
              <p className="p-3 mb-5 overflow-hidden text-sm font-light text-white-txt">
                {truncate(movie.overview, 150)}
              </p>
            </div>
          );
        })}
    </>
  );
};

export default memo(SimilarItems);
