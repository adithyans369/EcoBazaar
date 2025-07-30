import sys
import cv2
import numpy as np

def calculate_difference(before_path, after_path):
    before = cv2.imread(before_path)
    after = cv2.imread(after_path)

    # Resize for uniformity
    before = cv2.resize(before, (300, 300))
    after = cv2.resize(after, (300, 300))

    # Convert to grayscale
    before_gray = cv2.cvtColor(before, cv2.COLOR_BGR2GRAY)
    after_gray = cv2.cvtColor(after, cv2.COLOR_BGR2GRAY)

    # Compute absolute difference
    diff = cv2.absdiff(before_gray, after_gray)

    # Calculate mean pixel change
    score = np.mean(diff)

    return score

def assign_points(score):
    if score < 10:
        return 0  # No real change
    elif score < 30:
        return 10
    elif score < 60:
        return 20
    else:
        return 30  # Significant change

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python analyze.py <before_path> <after_path>")
        sys.exit(1)

    before_path = sys.argv[1]
    after_path = sys.argv[2]

    diff_score = calculate_difference(before_path, after_path)
    points = assign_points(diff_score)

    print(points)  # This is returned to server.py
