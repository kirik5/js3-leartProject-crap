import React from "react";
import PropTypes from "prop-types";
import AnswerChecked from "./answer-checked";
import {useDispatch, useSelector} from "react-redux";
import {changeGenreAnswers} from "../../../../../../reducers/genre-answers-slice";
import {checkedId} from "../../../../../../reducers/game-action-thunk";

const AnswerCheckedContainer = ({id}) => {
    const isChecked = useSelector(checkedId(id));
    const dispatch = useDispatch();
    const changeChecked = () => dispatch(changeGenreAnswers(id));

    return (
        <AnswerChecked
            id={id}
            isChecked={isChecked}
            changeChecked={changeChecked}
        />
    )
};

export default AnswerCheckedContainer;


AnswerCheckedContainer.propTypes = {
    id: PropTypes.number.isRequired,
}