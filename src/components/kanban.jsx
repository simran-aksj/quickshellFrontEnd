import React, { useCallback, useState, useEffect } from "react";
import { loadGrid, mapUsersByUserId } from "./utils";
import Header from "./Header";
import Grid from "./Grid";
import Spinner from "./Spinner";

const Kanban = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userMap, setUserMap] = useState({});
  const [gridContent, setGridContent] = useState({});
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");

  useEffect(() => {
    initializeSettings();
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        const { tickets, users } = data;
        setTickets(tickets);
        setUserMap(mapUsersByUserId(users));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!tickets.length) return;
    const updatedGrid = loadGrid(tickets, groupBy, sortBy);
    setGridContent(updatedGrid);
    setIsLoading(false);
  }, [tickets, groupBy, sortBy]);

  const handleGroupByChange = useCallback((newGrouping) => {
    setIsLoading(true);
    setGroupBy(newGrouping);
    persistSettings({ groupBy: newGrouping });
  }, []);

  const handleSortByChange = useCallback((newOrdering) => {
    setIsLoading(true);
    setSortBy(newOrdering);
    persistSettings({ sortBy: newOrdering });
  }, []);

  const persistSettings = useCallback((settings) => {
    for (const key in settings) {
      localStorage.setItem(key, settings[key]);
    }
  }, []);

  const initializeSettings = useCallback(() => {
    setGroupBy(localStorage.getItem("groupBy") || "status");
    setSortBy(localStorage.getItem("sortBy") || "priority");
  }, []);

  return (
    <div className="App">
      <Header
        grouping={groupBy}
        setGrouping={handleGroupByChange}
        ordering={sortBy}
        setOrdering={handleSortByChange}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <Grid gridData={gridContent} grouping={groupBy} userIdToData={userMap} />
      )}
    </div>
  );
};

export default Kanban;
