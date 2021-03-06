import React, { useReducer, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/pro-duotone-svg-icons';

import Movie from '../../../models/Movie';
import AuthContext from '../../../store/auth-context';
import EvaluationChart from '../Chart/EvaluationChart';
import EvaluationForm from './EvaluationForm';
import OverallCommentForm from './OverallCommentForm';
import { Evaluation, CriteriaList, CriterionName } from '../../../models/Evaluation';
import {
    createEvaluationList,
    isEvaluationEmpty,
} from '../../../utilities/evaluation-util/evaluation-util';
import { putUserMovie } from '../../../api/user-movie-api';

type State = {
    evaluation: Evaluation;
};

enum ActionType {
    FIX_RATING_AND_TEXT = 'fixRatingAndText',
    FIX_OVERALL_COMMENT = 'fixOverallComment',
}

type Action =
    | {
          type: ActionType.FIX_RATING_AND_TEXT;
          criterionName: CriterionName;
          newRating: number;
          newText: string;
      }
    | {
          type: ActionType.FIX_OVERALL_COMMENT;
          newComment: string;
      };

function evaluationReducer(state: State, action: Action) {
    const currEvaluation = state.evaluation;

    switch (action.type) {
        case ActionType.FIX_RATING_AND_TEXT:
            const { criterionName, newRating, newText } = action;
            currEvaluation.setRating(criterionName, newRating);
            currEvaluation.setText(criterionName, newText);
            break;
        case ActionType.FIX_OVERALL_COMMENT:
            const { newComment } = action;
            currEvaluation.setOverallComment(newComment);
            break;
    }

    return { evaluation: currEvaluation };
}

const MovieEvaluation: React.FC<{ movie: Movie }> = ({ movie }) => {
    const navigate = useNavigate();
    const user = useContext(AuthContext).user;

    const title = movie.title;
    const evaluation: Evaluation = movie.evaluation || new Evaluation();

    // Use useReducer hook
    const [evaluationState, dispatchAction] = useReducer(evaluationReducer, { evaluation });
    const evaluationList = createEvaluationList(evaluationState.evaluation, CriteriaList);

    const criterionChangeHandler = (
        criterionName: CriterionName,
        newRating: number,
        newText: string,
    ) => {
        dispatchAction({ type: ActionType.FIX_RATING_AND_TEXT, criterionName, newRating, newText });
    };

    const overallCommentHandler = (newComment: string) => {
        dispatchAction({ type: ActionType.FIX_OVERALL_COMMENT, newComment });
    };

    useEffect(() => {
        // console.log("Send http request for store!");
        if (!user) return;
        const userId = user.id;
        const newEvaluation = evaluationState.evaluation;
        if (isEvaluationEmpty(newEvaluation)) return;

        movie.evaluation = newEvaluation;
        putUserMovie(userId, movie);
    }, [evaluationState, movie, user]);

    // There is no guarantee that the user is always logged in.
    if (!user) {
        console.log('User is not login...');
        return <h3>Please login first</h3>;
    }

    return (
        <main className="movie-evaluation">
            <h2 className="evaluation-heading">
                Evaluate <span>{title}</span>
                <Link to="#" onClick={() => navigate(-1)} className="link">
                    Go Back
                    <FontAwesomeIcon className="icon" icon={faArrowRight as any} />
                </Link>
            </h2>
            <div className="evaluation-content">
                <EvaluationChart
                    evaluationList={evaluationList}
                    title={title}
                    userMovies={user.movies}
                />
                <section className="evaluation-form-wrapper">
                    <OverallCommentForm
                        onChangeComment={overallCommentHandler}
                        initialComment={evaluationState.evaluation.overallComment}
                    />
                    <EvaluationForm
                        evaluationList={evaluationList}
                        onChangeCriterion={criterionChangeHandler}
                    />
                </section>
            </div>
        </main>
    );
};

export default MovieEvaluation;
