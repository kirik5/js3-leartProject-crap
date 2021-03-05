import questions from "../mocks/questions";
import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import instance from "../api";


const initialState = {
    numberOfActiveQuestion: -1,
    questions: questions,
    status: 'idle',
};

export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
    const response = await instance.get("/questions");
    return response.data;
});

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addActiveQuestionNumber(state) {
            state.numberOfActiveQuestion += 1;
        },
        resetGame(state) {
            return initialState;
        },
        getQuestions(state) {
            return state.questions = instance("/question")
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchQuestions.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchQuestions.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.status = 'idle';
            })
    },
});

export const {addActiveQuestionNumber, resetGame} = questionSlice.actions;

export default questionSlice.reducer;


export const getQuestionsStatus = state => state.questions.status;

export const getNumberOfActiveQuestion = state => state.questions.numberOfActiveQuestion;

export const allQuestions = state => state.questions.questions;

export const isNotEndOfQuestions = createSelector(
    getNumberOfActiveQuestion,
    state => state.questions.questions.length,
    (numberOfActiveQuestion, lengthOfQuestions) => lengthOfQuestions > numberOfActiveQuestion,
);

export const getActiveQuestion = createSelector(
    getNumberOfActiveQuestion,
    allQuestions,
    (numberOfActiveQuestion, questions) => questions[numberOfActiveQuestion],
);

export const getTypeOfQuestion = createSelector(
    getActiveQuestion,
    question => {
        if (question) {
            return question.type;
        }
        return null;
    }
);

export const isStartScreen = createSelector(
    getNumberOfActiveQuestion,
    numberOfActiveQuestion => {
        if (numberOfActiveQuestion === -1) {
            return true;
        }
        return false;
    }
);

export const getAnswers = createSelector(
    getActiveQuestion,
    question => question.answers,
);

export const getGenre = createSelector(
    getActiveQuestion,
    question => question.genre,
);