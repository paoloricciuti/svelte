import { flushSync } from 'svelte';
import { test } from '../../test';

export default test({
	html: `
		<label>
			<input type="checkbox" value="1"> 1
		</label>
		<label>
			<input type="checkbox" value="2"> 2
		</label>
		<label>
			<input type="checkbox" value="3"> 3
		</label>

		<p>1, 2, 3</p>`,

	ssrHtml: `
		<label>
			<input type="checkbox" value="1" checked> 1
		</label>
		<label>
			<input type="checkbox" value="2" checked> 2
		</label>
		<label>
			<input type="checkbox" value="3" checked> 3
		</label>

		<p>1, 2, 3</p>`,

	test({ assert, component, target, window }) {
		const inputs = target.querySelectorAll('input');
		assert.equal(inputs[0].checked, true);
		assert.equal(inputs[1].checked, true);
		assert.equal(inputs[2].checked, true);

		const event = new window.Event('change');

		inputs[0].checked = false;
		inputs[0].dispatchEvent(event);
		flushSync();

		assert.htmlEqual(
			target.innerHTML,
			`
			<label>
				<input type="checkbox" value="1"> 1
			</label>
			<label>
				<input type="checkbox" value="2"> 2
			</label>
			<label>
				<input type="checkbox" value="3"> 3
			</label>

			<p>2, 3</p>
		`
		);

		component.selected = [[1, 3]];
		assert.equal(inputs[0].checked, true);
		assert.equal(inputs[1].checked, false);
		assert.equal(inputs[2].checked, true);

		assert.htmlEqual(
			target.innerHTML,
			`
			<label>
				<input type="checkbox" value="1"> 1
			</label>
			<label>
				<input type="checkbox" value="2"> 2
			</label>
			<label>
				<input type="checkbox" value="3"> 3
			</label>

			<p>1, 3</p>
		`
		);
	}
});
