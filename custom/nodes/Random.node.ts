import {
	INodeType,
	INodeTypeDescription,
	INodeExecutionData,
	NodeConnectionType,
	IExecuteFunctions,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:random.svg',
		group: ['transform'],
		version: 1,
		description: 'Generates a random integer using Random.org',
		defaults: {
			name: 'Random',
			color: '#772244',
		},
		inputs: ['main' as NodeConnectionType], //Não funcionou com [NodeConnectionType.Main]
		outputs: ['main' as NodeConnectionType], 
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				options: [
					{
						name: 'True Random Number Generator',
						value: 'trng', //Abreviação para True Random Number Generator
					},
				],
				default: 'trng',
				description: 'Select the operation to perform',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				description: 'Minimum value',
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 100,
				description: 'Maximum value',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			if (operation === 'trng') {
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;

				const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url,
				});

				const randomNumber = parseInt(response as string, 10);

				returnData.push({
					json: {
						random: randomNumber,
						min,
						max,
					},
				});
			}
		}

		return this.prepareOutputData(returnData);
	}
}
