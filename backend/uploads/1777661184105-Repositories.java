// ── BusRepository.java ───────────────────────────────────────
package com.dtc.repository;

import com.dtc.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
    List<Bus> findByIsActiveTrue();
    boolean existsByBusNumber(String busNumber);
}


// ── RouteRepository.java ─────────────────────────────────────
package com.dtc.repository;

import com.dtc.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByIsActiveTrue();
    List<Route> findBySourceStopContainingIgnoreCase(String source);
    List<Route> findByDestinationStopContainingIgnoreCase(String destination);
    List<Route> findBySourceStopContainingIgnoreCaseAndDestinationStopContainingIgnoreCase(
            String source, String destination);
}


// ── ScheduleRepository.java ──────────────────────────────────
package com.dtc.repository;

import com.dtc.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByRouteId(Long routeId);
    List<Schedule> findByBusId(Long busId);
    List<Schedule> findByIsActiveTrue();
}
