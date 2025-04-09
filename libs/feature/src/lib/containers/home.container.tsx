import { HomeContainerPropsDto } from '@pure-workspace/domain';
import { FC } from 'react';

export const HomeContainer: FC<HomeContainerPropsDto> = ({ session }) => {
  return (
    <div>
      <div>Hello home!</div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};
