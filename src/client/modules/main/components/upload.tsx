import * as React from 'react';
import { Segment, Input, Form } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { FileState } from '../../../config/state';

type Props = {
  label: string;
  state: FileState
}

export const Upload = observer<Props>(({ label, state }) => (
  <Form.Field>
    <label>{label} ({state.name})</label>
    <div className="ui action input">
      <Input
        icon="attach"
        type="file"
        onChange={e => {
          const file = e.currentTarget.files[0];
          if (file) {
            var reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = function(evt: any) {
              state.name = file.name;
              state.load(file.name, evt.target.result);
            };
          }
        }}
      />
    </div>
  </Form.Field>
));
