import * as React from 'react';
import { Segment, Input, Form, Divider, Button, Header, Table } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { Upload } from './upload';
import { SavedResult } from '../../../config/state';

type Params = {
  context?: App.Context;
  state?: App.State;
};

function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();
  document.body.removeChild(element);
}

function prepareDownload(state: App.State) {
  let result = 'Last Name,First Name,Username,Student ID,FILL THIS\n';
  result += state.savedResults.results.map(s => `${s.lastName.trim()},${s.firstName.trim()},${s.id},${s.id},${s.score}`).join('\n');
  download('result.csv', result);

}

export const App = inject('context', 'state')(
  observer(({ context, state }: Params) => {
    return (
      <div style={{ padding: '12px' }}>
        <Segment className="ui form">
          <Upload label="Saved Results" state={state.savedResults} />

          <Button onClick={() => prepareDownload(state)} content="Download Results" icon="download" />
        </Segment>

        <Header content="Results" attached="top" />
        <Segment attached="bottom">
          {!state.savedResults.results.length && <div>No results loaded</div>}
          {state.savedResults.results.length > 0 && (
            <Table striped>
              <Table.Header>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Score</Table.HeaderCell>
                {state.savedResults.correctAnswers.map((a, index) => (
                  <Table.HeaderCell key={index}>{index + 1}</Table.HeaderCell>
                ))}
              </Table.Header>
              <Table.Body>
                {state.savedResults.results.map((s, j) => (
                  <Table.Row key={j}>
                    <Table.Cell>{s.lastName} {s.firstName}</Table.Cell>
                    <Table.Cell>{s.id}</Table.Cell>
                    <Table.Cell>{s.score}</Table.Cell>
                    {s.answers.map((a, i) => (
                      <Table.Cell
                        key={j + '-' + i}
                        style={{ background: s.scores[i] === 0 ? 'red' : s.scores[i] === 1 ? 'green' : 'yellow' }}
                      >
                        <span>{a}</span>
                        <span>{s.scores[i] > 0 && s.scores[i] < 1 ? ` (${s.scores[i]})` : ''}</span>
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Segment>

        <Header content="Statistics" attached="top" />
        <Segment attached="bottom">
          <Table striped>
            <Table.Header>
              <Table.HeaderCell>Fail</Table.HeaderCell>
              <Table.HeaderCell>Pass</Table.HeaderCell>
              <Table.HeaderCell>Credit</Table.HeaderCell>
              <Table.HeaderCell>Distinction</Table.HeaderCell>
              <Table.HeaderCell>HD</Table.HeaderCell>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{state.fail}%</Table.Cell>
                <Table.Cell>{state.pass}%</Table.Cell>
                <Table.Cell>{state.credit}%</Table.Cell>
                <Table.Cell>{state.distinction}%</Table.Cell>
                <Table.Cell>{state.hd}%</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  })
);
