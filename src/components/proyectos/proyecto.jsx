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
		this.ajaxRead = this.ajaxRead.bind(this);
		this.ajaxSave = this.ajaxSave.bind(this);
	}

	componentDidMount(){
		switch (this.props.match.params.action){
			case 'new':
				this.setState({readOnly: false})
				break
			case 'show':
				this.setState({readOnly: true})
				this.ajaxRead(this.props.match.params.id)
				break
			case 'edit':
				this.setState({readOnly: false})
				this.ajaxRead(this.props.match.params.id)
				break
			default:
				break
		}
	}

	ajaxRead(id){
		$.ajax({
			url: 'http://localhost:3004/proyectos/' + id,
			dataType: 'json',
			cache: false,
			method: 'get'
		}).done(function(data){
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
		}.bind(this)).fail(function(jqXHR, textStatus, errorThrown){
			alert(textStatus)
		})	
	}

	ajaxSave(id){
		$.ajax({
			url: 'http://localhost:3004/proyectos/' + id,
			dataType: 'json',
			cache: false,
			data: this.state,
			method: function(){
				if (this.props.match.params.action === 'new'){
					return 'post'
				} else {
					return 'put'
				}
			}
		}).done(function(data){
			alert('OK')
		}).fail(function(jqXHR, textStatus, errorThrown){
			alert(textStatus)
		})	
	}

	handleInputChange(event) {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const id = target.id;
	    this.setState({ [id]: value });
	}

	handleSubmit(event) {
	    event.preventDefault();
	    if (this.props.match.params.action === 'new'){
	    	this.ajaxSave('')
	    } else {
	    	this.ajaxSave(this.props.match.params.id)
	    }

	}

	render(){
		const editPath = '/proyecto/edit/' + this.props.match.params.id

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
				  	{!this.state.readOnly && <Button variant="danger" type="submit" disabled={this.state.readOnly}>Submit</Button>}
				</Form>
				<Button href="/proyectos" className="btn-volver">Volver</Button>
				{this.state.readOnly && <Button href={editPath} variant="warning" className="btn-volver">Editar</Button>}
			</div>
		)
	}
}