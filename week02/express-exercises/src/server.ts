import express, { Request, Response , Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import * as path from 'node:path'
import { errorHandler, notFound } from './error';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 7007;

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))

app.get('/', (_req: Request, res: Response) => {
	res.sendFile(path.join(__dirname , "..", "/public/index.html"))
});

app.get('/persons', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await fetch("http://localhost:3000/persons", {
			method: "GET",
		});

		const persons = await response.json();

		if (persons) {
			res.status(200).json(persons)
		} else {
			res.status(500).json({ msg: "Could not find persons"})
		}
	} catch (err) {
		next(err)
	}
});

app.get('/persons/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id;
		const response = await fetch("http://localhost:3000/persons", {
			method: "GET",
		});
		const persons: {id: number}[] = await response.json()
		const person = persons.find(p => p.id == parseInt(id))
		if (person) {
			res.status(200).json(person);
		} else {
			res.status(404)
			throw new Error(`Could not find person with id:${id}.`);
		}
	} catch (err) {
		next(err)
	}
});

app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const {firstName, lastName} = req.body

		console.log(firstName, lastName)

		res.status(200).json({
			msg: "ok",
			data: {firstName, lastName}
		});
	} catch (err) {
		next(err)
	}
});

app.post('/persons', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await fetch("http://localhost:3000/persons", {
			method: "POST",
			body: JSON.stringify(req.body),
		});

		if (!response.ok) {
			res.status(response.status)
			throw new Error("Could not post. " + await response.json());
		}

		const newPerson = await response.json();

		res.status(201).json(newPerson);
	} catch (err) {
		next(err);
	}
});

app.put('/persons/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const id = req.params.id

		const response = await fetch(`http://localhost:3000/persons/${id}`, {
			method: "PUT",
			body: req.body
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

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});
