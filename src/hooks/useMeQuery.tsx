import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { QueryResult } from '@apollo/react-common';
import { useQuery } from '@apollo/react-hooks';
import { User } from '../types';

interface GetMeResponse {
  me: User;
}

const GET_ME_QUERY = gql`
  {
    me {
      id
      name
    }
  }
`;

export const useMeQuery = (): QueryResult<GetMeResponse> => {
  return useQuery<GetMeResponse>(GET_ME_QUERY);
};
