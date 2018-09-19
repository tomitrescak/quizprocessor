import { observable, action, IObservableArray } from 'mobx';
import { context } from './context';

declare global {
  namespace App { export type State = StateModel; }
}

export abstract class FileState {
  @observable name = '';
  content = '';
  loaded = false;

  abstract load(name: string, content: string): void;
}

function round(num: number) {
  return Math.round(num * 100) / 100;
}

type Student = {
  lastName: string;
  firstName: string;
  id: string;
  group: number;
};

type StudentAnswers = {
  id: string;
  answers: string[][];
};

type SavedStudent = {
  lastName: string;
  firstName: string;
  id: string;
  score: number;
  scores: number[];
  answers: string[][];
};

export class SavedResult extends FileState {
  students: Student[];

  correctAnswers: string[][];
  @observable results: IObservableArray<SavedStudent> = observable([]);

  @action
  process(result: StudentAnswers) {
    let studentRecord = this.students.find(s => s.id === result.id);
    let lastName: string = studentRecord ? studentRecord.lastName : 'NOT';
    let firstName: string = studentRecord ? studentRecord.firstName : 'NOT';

    // calculate score
    let score = 0;
    let scores = [];

    for (let i = 0; i < result.answers.length; i++) {
      let userAnswer = result.answers[i].map(u => u.trim());
      let correctAnswer = this.correctAnswers[i];

      if (correctAnswer.length === 1) {
        const currentScore = correctAnswer[0] === userAnswer[0] ? 1 : 0;
        score += currentScore;
        scores.push(currentScore);
      } else if (correctAnswer.length > 1 && userAnswer.length == 1) {
        const currentScore = correctAnswer.indexOf(userAnswer[0]) >= 0 ? 0.75 : 0;
        score += currentScore;
        scores.push(currentScore);
      } else {
        // find how many correct answers are there
        let correct = correctAnswer.reduce((previous, next) => (userAnswer.indexOf(next) >= 0 ? 1 : 0) + previous, 0);
        let incorrect = userAnswer.reduce(
          (previous, next) => (correctAnswer.indexOf(next) == -1 ? 1 : 0) + previous,
          0
        );

        // remove incorrect answers
        correct -= incorrect;

        // clamp
        if (correct < 0) {
          correct = 0;
        }

        // calculate score
        const currentScore = round(correct / correctAnswer.length);
        score += currentScore;
        scores.push(currentScore);
      }
    }

    return {
      id: result.id,
      lastName,
      firstName,
      score: round(score),
      scores,
      answers: result.answers
    };
  }

  @action
  load(name: string, content: string): void {
    // load students
    let lines = content.split('\n');
    let phase: 'students' | 'groups' = 'students';
    let group = 0;

    this.students = [];
    this.results.clear();

    // process all saved lines
    for (let line of lines) {
      if (!line.trim()) {
        continue;
      }

      const split = line.split(',');

      // groups are delineated with empty start name
      if (!split[0]) {
        phase = 'groups';
        this.correctAnswers = split.slice(1).map(s => s.split('|').map(d => d.trim()));
        group++;

        // add them to answer sheet
        this.results.push({
          id: '--',
          lastName: 'CORRECT',
          firstName: 'ANSWERS',
          score: this.correctAnswers.length,
          scores: this.correctAnswers.map(a => 1),
          answers: this.correctAnswers
        });

        continue;
      }

      if (phase === 'students') {
        this.students.push({ lastName: split[1].trim(), firstName: split[2].trim(), id: split[0].trim(), group });
      }
      if (phase === 'groups') {
        const parts = line.split(',');
        const id = parts.slice(parts.length - 8);
        const answers = parts.slice(1, parts.indexOf(''));

        this.results.push(
          this.process({
            id: id.join('').trim(),
            answers: answers.map(a => a.split('|'))
          })
        );
      }
    }

    let answers = this.correctAnswers.length;
    let half = this.correctAnswers.length / 2;
    let interval = half / 4;
    state.fail = Math.round(this.results.filter(r => r.score < answers / 2).length / (this.results.length - 2) * 100);
    state.pass =
    Math.round(this.results.filter(r => r.score >= half && r.score < half + interval).length / (this.results.length - 2) * 100);
    state.credit =
    Math.round(this.results.filter(r => r.score >= half + interval && r.score < half + 2 * interval).length /
      (this.results.length - 2) * 100);
    state.distinction =
    Math.round(this.results.filter(r => r.score >= half + 2 * interval && r.score < half + 3 * interval).length /
      (this.results.length - 2) * 100);
    state.hd =
    Math.round(this.results.filter(r => r.score >= half + 3 * interval && r.score < half + 4 * interval).length /
      (this.results.length - 2) * 100);

    this.name = `Loaded ${this.results.length} results`;
  }
}

class StateModel {
  @observable text = '';
  @observable.shallow savedResults = new SavedResult();

  @observable fail: number = 0;
  @observable pass: number = 0;
  @observable credit: number = 0;
  @observable distinction: number = 0;
  @observable hd: number = 0;

  quizName: string;

  constructor() {
    // context.db.find({ type: 'text' }).then(doc => {
    //   if (doc.length) {
    //     this.text = doc[0].text;
    //   }
    // });
  }
}
export const state = new StateModel();
