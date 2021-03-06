import React from 'react'
import $ from 'jquery'
import {ListGroup, Button} from 'react-bootstrap'

export default class ProyectosLst extends React.Component {

	constructor(props){
		super(props)

		this.state = {proyectos: []}
	}

	componentDidMount(){
		$.ajax({
			url: 'http://localhost:3004/proyectos/',
			dataType: 'json',
			cache: false,
			method: 'get'
		}).done(function(data){
			this.setState({
				proyectos: data
			})
		}.bind(this)).fail(function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR)
			alert(errorThrown)
		})	
	}

	render(){
		const proyectos = this.state.proyectos.map(function({id, nombre, desc}){
			return <ListGroup.Item action href={'/proyecto/show/'+id} key={id}>{id} - {nombre}</ListGroup.Item>
		})

		return(
			<div>
				<div className="row misproys">
					<div className="col">
						<h4>Mis Proyectos</h4>
					</div>
					<div className="col">
						<Button href="/proyecto/new/0" className="btn-nuevo">Nuevo</Button>
					</div>
				</div>
				<ListGroup>
					{proyectos}
				</ListGroup>
			</div>
		)
	}
	

}