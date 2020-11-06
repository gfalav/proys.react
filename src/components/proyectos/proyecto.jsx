import React from 'react'
import {Form, Button} from 'react-bootstrap'
import $ from 'jquery'

export default class Proyecto extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			nombre: '',
			desc: '',
			proyectista: '',
			comitente: '',
			contratista: '',
			expediente: '',
			ubicacion: '',
			created_at: new Date(),
			userId: '',
			readOnly: true
		}


		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentDidMount(){
		if (this.props.match.params.id === 'new') {
			this.setState({readOnly: false})
		} else {
			$.ajax({
				url: 'http://localhost:3004/proyectos/'+this.props.match.params.id,
				dataType: 'json',
				cache: false,
				success: function(data){
					this.setState({
						nombre: data.nombre,
						desc: data.desc,
						proyectista: data.proyectista,
						comitente: data.comitente,
						contratista: data.contratista,
						expediente: data.expediente,
						ubicacion: data.ubicacion,
						created_at: data.created_at,
						userId: data.userId
					})
				}.bind(this)
			})
		}
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const id = target.id;
	    this.setState({ [id]: value });
	}

	handleSubmit(event) {
	    event.preventDefault();
	    this.setState({readOnly: true})
	}

	handleEdit(event){
		event.preventDefault();
		this.setState({readOnly: false})
	}

	render(){

		return(
			<div>
				<h4>Datos del proyecto</h4>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group controlId="nombre">
					    <Form.Label>Nombre</Form.Label>
					    <Form.Control type="text" size="sm" value={this.state.nombre} onChange={this.handleInputChange} readOnly={this.state.readOnly}/>
				  	</Form.Group>
					<Form.Group controlId="desc">
					    <Form.Label>Descripción</Form.Label>
					    <Form.Control type="text" size="sm" value={this.state.desc} onChange={this.handleInputChange} readOnly={this.state.readOnly}/>
				  	</Form.Group>
					<Form.Group controlId="proyectista">
					    <Form.Label>Proyectista</Form.Label>
					    <Form.Control type="text" size="sm" value={this.state.proyectista} onChange={this.handleInputChange} readOnly={this.state.readOnly}/>
				  	</Form.Group>
					<Form.Group controlId="comitente">
					    <Form.Label>Comitente</Form.Label>
					    <Form.Control type="text" size="sm" value={this.state.comitente} onChange={this.handleInputChange} readOnly={this.state.readOnly}/>
				  	</Form.Group>
					<Form.Group controlId="contratista">
					    <Form.Label>Contratista</Form.Label>
					    <Form.Control type="text" size="sm" value={this.state.contratista} onChange={this.handleInputChange} readOnly={this.state.readOnly}/>
				  	</Form.Group>
					<Form.Group controlId="expediente">
					    <Form.Label>Expediente</Form.Label>
					    <Form.Control type="text" size="sm" value={this.state.expediente} onChange={this.handleInputChange} readOnly={this.state.readOnly}/>
				  	</Form.Group>
					<Form.Group controlId="ubicacion">
					    <Form.Label>Ubicación</Form.Label>
					    <Form.Control type="text" size="sm" value={this.state.ubicacion} onChange={this.handleInputChange} readOnly={this.state.readOnly}/>
				  	</Form.Group>
				  	<Button variant="danger" type="submit" disabled={this.state.readOnly}>Submit</Button>
				</Form>
				<Button href="/proyectos" className="btn-volver">Volver</Button>
				<Button variant="warning" className="btn-volver" disabled={!this.state.readOnly} onClick={this.handleEdit}>Editar</Button>
			</div>
		)
	}
}