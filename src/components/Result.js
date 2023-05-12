import React from 'react';
import PropTypes from 'prop-types';

const Result = ({ result }) => (
    <li>
        {result.codeResult.code}
    </li>
);

Result.propTypes = {
    result: PropTypes.object
};

export default Result;