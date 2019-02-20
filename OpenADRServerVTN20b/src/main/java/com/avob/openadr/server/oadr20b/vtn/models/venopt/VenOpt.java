package com.avob.openadr.server.oadr20b.vtn.models.venopt;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.avob.openadr.server.common.vtn.models.demandresponseevent.DemandResponseEvent;
import com.avob.openadr.server.common.vtn.models.demandresponseevent.DemandResponseEventOptEnum;
import com.avob.openadr.server.common.vtn.models.ven.Ven;
import com.avob.openadr.server.common.vtn.models.venmarketcontext.VenMarketContext;
import com.avob.openadr.server.common.vtn.models.venresource.VenResource;

/**
 * 
 * @author bzanni
 *
 */
@Entity
@Table(name = "venopt")
public class VenOpt {

	/**
	 * Autogenerated unique id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	/**
	 * Related ven
	 */
	@ManyToOne
	@JoinColumn(name = "ven_id")
	private Ven ven;

	/**
	 * Related marketcontext
	 */
	@ManyToOne
	@JoinColumn(name = "venmarketcontext_id")
	private VenMarketContext marketContext;

	/**
	 * Related resource
	 */
	@ManyToOne
	@JoinColumn(name = "venresource_id")
	private VenResource venResource;

	/**
	 * Related resource
	 */
	@ManyToOne
	@JoinColumn(name = "event_id")
	private DemandResponseEvent event;

	@NotNull
	private String optId;

	@Column(name = "optStart")
	@NotNull
	private Long start;

	@Column(name = "OptEnd")
	private Long end;

	@Enumerated(EnumType.STRING)
	private DemandResponseEventOptEnum opt;

	public VenOpt() {
	}

	public VenOpt(Ven ven, VenResource resource, VenMarketContext marketContext, String optId, long start, long end,
			DemandResponseEventOptEnum venOpt) {
		this.ven = ven;
		this.marketContext = marketContext;
		this.venResource = resource;
		this.optId = optId;
		this.setStart(start);
		this.setEnd(end);
		this.opt = venOpt;
	}

	public VenOpt(Ven ven, VenResource resource, VenMarketContext marketContext, DemandResponseEvent event,
			DemandResponseEventOptEnum venOpt) {
		this.ven = ven;
		this.marketContext = marketContext;
		this.venResource = resource;
		this.setEvent(event);
		this.opt = venOpt;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Ven getVen() {
		return ven;
	}

	public void setVen(Ven ven) {
		this.ven = ven;
	}

	public DemandResponseEventOptEnum getOpt() {
		return opt;
	}

	public void setOpt(DemandResponseEventOptEnum venOpt) {
		this.opt = venOpt;
	}

	public Long getStart() {
		return start;
	}

	public void setStart(Long start) {
		this.start = start;
	}

	public Long getEnd() {
		return end;
	}

	public void setEnd(Long end) {
		this.end = end;
	}

	public String getOptId() {
		return optId;
	}

	public void setOptId(String optId) {
		this.optId = optId;
	}

	public VenMarketContext getMarketContext() {
		return marketContext;
	}

	public void setMarketContext(VenMarketContext marketContext) {
		this.marketContext = marketContext;
	}

	public VenResource getVenResource() {
		return venResource;
	}

	public void setVenResource(VenResource venResource) {
		this.venResource = venResource;
	}

	public DemandResponseEvent getEvent() {
		return event;
	}

	public void setEvent(DemandResponseEvent event) {
		this.event = event;
	}

}
