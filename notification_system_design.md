### Stage 6: Notification Priority System

#### Objective

To design a system that prioritizes notifications based on importance and recency.

---

### Priority Rules

1. **Type Priority**

   * Placement → Highest priority
   * Result → Medium priority
   * Event → Lowest priority

2. **Recency**

   * More recent notifications are prioritized within the same type.

---

### Algorithm

* Each notification is assigned a score:

  * Placement = 3
  * Result = 2
  * Event = 1

* Timestamp is converted to milliseconds.

* Final priority:

  ```
  priority = type_weight × constant + timestamp
  ```

* Notifications are sorted in descending order of priority.

* Top 10 notifications are selected.

---

### Optimization

* A **Min Heap (Priority Queue)** of size 10 can be used.

* This ensures efficient selection of top notifications.

* Time Complexity:

  * O(n log 10) ≈ O(n)

---

### Logging

Logging middleware is used to:

* Track API calls
* Monitor processing steps
* Capture errors

This improves debugging and system reliability.
