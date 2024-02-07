import express, { Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 7007;

app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response) => {
	res.send('Welcome to Express & TypeScript Server');
});

app.get('/persons', async (_req: Request, res: Response) => {
	const response = await fetch("http://localhost:3000/persons", {
		method: "GET",
	});

	const persons = await response.json();

	if (persons) {
		res.status(200).json(persons)
	} else {
		res.status(500).json({ msg: "Could not find persons"})
	}
});

app.get('/persons/:id', async (req: Request, res: Response) => {
	const id = req.params.id;
	const response = await fetch("http://localhost:3000/persons", {
		method: "GET",
	});
	const persons: {id: number}[] = await response.json()
	const person = persons.find(p => p.id == parseInt(id))
	if (person) {
		res.status(200).json(person);
	} else {
		res.status(404).json({msg: 'Person not found'});
	}
});

app.post('/persons', async (req: Request, res: Response) => {
	const response = await fetch("http://localhost:3000/persons", {
		method: "POST",
		body: JSON.stringify(req.body),
	});

	if (!response.ok) {
		res.status(response.status).json(await response.json())
	}

	const newPerson = await response.json();

	res.status(201).json(newPerson)
});

app.put('/persons/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id

		const response = await fetch(`http://localhost:3000/persons/${id}`, {
			method: "PUT",
			body: JSON.stringify(req.body)
		});

		if (!response.ok) {
			res.status(response.status).json(await response.json())
		}

		const newPerson = await response.json();

		res.status(201).json(newPerson)
	} catch (err) {
		next(err)
	}
});

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});
